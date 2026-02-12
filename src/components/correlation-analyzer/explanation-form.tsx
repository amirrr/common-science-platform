"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExplanationOption } from "@/types/correlation";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  type DropAnimation,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Loader2, Info, ArrowRight, GripVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const explanationFormSchema = z.object({
  rankedExplanationIds: z.array(z.string()).length(3, {
    message: "Please rank exactly 3 explanations.",
  }),
  explanationText: z
    .string()
    .max(500, {
      message: "Your explanation must not exceed 500 characters.",
    })
    .optional()
    .default(""),
});

export type ExplanationFormValues = z.infer<typeof explanationFormSchema>;

interface ExplanationFormProps {
  explanationsToList: ExplanationOption[];
  onSubmitAttempt: (data: ExplanationFormValues) => void;
  onNext?: () => void;
  isSubmitting: boolean;
  existingResponse?: ExplanationFormValues | null;
}

/** Pure function to compute items from props — used by lazy initializer and prop-change handler */
function computeInitialItems(
  explanationsToList: ExplanationOption[],
  existingResponse?: ExplanationFormValues | null,
): { pool: string[]; ranked: string[] } {
  if (existingResponse?.rankedExplanationIds) {
    const ranked = existingResponse.rankedExplanationIds.slice(0, 3);
    const pool = explanationsToList
      .map((e) => e.id)
      .filter((id) => !ranked.includes(id));
    return { pool, ranked };
  }
  return {
    pool: explanationsToList.map((e) => e.id),
    ranked: [],
  };
}

export function ExplanationForm({
  explanationsToList,
  onSubmitAttempt,
  onNext,
  isSubmitting,
  existingResponse,
}: ExplanationFormProps) {
  const [items, setItems] = useState<{ pool: string[]; ranked: string[] }>(() =>
    computeInitialItems(explanationsToList, existingResponse),
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  // Re-initialize items when props change
  useEffect(() => {
    setItems(computeInitialItems(explanationsToList, existingResponse));
  }, [explanationsToList, existingResponse]);

  const form = useForm<ExplanationFormValues>({
    resolver: zodResolver(explanationFormSchema),
    defaultValues: {
      rankedExplanationIds: existingResponse?.rankedExplanationIds || [],
      explanationText: existingResponse?.explanationText || "",
    },
    mode: "onChange",
  });

  // Sync internal ranked state → react-hook-form (this is fine: setValue is an external-system call)
  useEffect(() => {
    form.setValue("rankedExplanationIds", items.ranked, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [items.ranked, form]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const activeIdStr = active.id as string;
      const overId = String(over.id);

      // Find containers using prev state (avoids stale closure)
      const activeContainer: "pool" | "ranked" | null = prev.pool.includes(
        activeIdStr,
      )
        ? "pool"
        : prev.ranked.includes(activeIdStr)
          ? "ranked"
          : null;

      let overContainer: "pool" | "ranked" | null = prev.pool.includes(overId)
        ? "pool"
        : prev.ranked.includes(overId)
          ? "ranked"
          : null;

      if (!overContainer) {
        if (overId === "pool-container") overContainer = "pool";
        else if (overId.startsWith("slot-")) overContainer = "ranked";
      }

      if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
      )
        return prev;

      // Prevent adding more than 3 items to ranked
      if (overContainer === "ranked" && prev.ranked.length >= 3) return prev;

      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeIndex = activeItems.indexOf(activeIdStr);

      // Determine insertion index
      let newIndex: number;
      if (overId.startsWith("slot-")) {
        newIndex = Math.min(parseInt(overId.split("-")[1]), overItems.length);
      } else if (overId === "pool-container") {
        newIndex = overItems.length;
      } else {
        const overIndex = overItems.indexOf(overId);
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        newIndex =
          overIndex >= 0
            ? overIndex + (isBelowOverItem ? 1 : 0)
            : overItems.length;
      }

      return {
        ...prev,
        [activeContainer]: activeItems.filter((item) => item !== activeIdStr),
        [overContainer]: [
          ...overItems.slice(0, newIndex),
          activeItems[activeIndex],
          ...overItems.slice(newIndex),
        ],
      };
    });
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    setItems((prev) => {
      const activeIdStr = active.id as string;
      const overIdStr = String(over.id);

      const activeContainer: "pool" | "ranked" | null = prev.pool.includes(
        activeIdStr,
      )
        ? "pool"
        : prev.ranked.includes(activeIdStr)
          ? "ranked"
          : null;

      let overContainer: "pool" | "ranked" | null = prev.pool.includes(
        overIdStr,
      )
        ? "pool"
        : prev.ranked.includes(overIdStr)
          ? "ranked"
          : null;

      if (!overContainer) {
        if (overIdStr === "pool-container") overContainer = "pool";
        else if (overIdStr.startsWith("slot-")) overContainer = "ranked";
      }

      if (!activeContainer || !overContainer) return prev;

      if (activeContainer === overContainer) {
        const containerItems = prev[activeContainer];
        const activeIndex = containerItems.indexOf(activeIdStr);
        let overIndex: number;

        if (overIdStr.startsWith("slot-")) {
          overIndex = Math.min(
            parseInt(overIdStr.split("-")[1]),
            containerItems.length - 1,
          );
        } else {
          overIndex = containerItems.indexOf(overIdStr);
        }

        if (
          activeIndex !== -1 &&
          overIndex !== -1 &&
          activeIndex !== overIndex
        ) {
          return {
            ...prev,
            [activeContainer]: arrayMove(
              containerItems,
              activeIndex,
              overIndex,
            ),
          };
        }
        return prev;
      }

      // Cross-container fallback (in case handleDragOver didn't fire)
      if (overContainer === "ranked" && prev.ranked.length >= 3) return prev;

      const sourceItems = prev[activeContainer].filter(
        (id) => id !== activeIdStr,
      );
      const targetItems = [...prev[overContainer]];

      let insertIndex: number;
      if (overIdStr.startsWith("slot-")) {
        insertIndex = Math.min(
          parseInt(overIdStr.split("-")[1]),
          targetItems.length,
        );
      } else if (overIdStr === "pool-container") {
        insertIndex = targetItems.length;
      } else {
        const idx = targetItems.indexOf(overIdStr);
        insertIndex = idx >= 0 ? idx : targetItems.length;
      }

      targetItems.splice(insertIndex, 0, activeIdStr);

      return {
        ...prev,
        [activeContainer]: sourceItems,
        [overContainer]: targetItems,
      };
    });

    // Enforce max 3 items in ranked
    setItems((prev) => {
      if (prev.ranked.length > 3) {
        const extra = prev.ranked.slice(3);
        return {
          pool: [...prev.pool, ...extra],
          ranked: prev.ranked.slice(0, 3),
        };
      }
      return prev;
    });

    setActiveId(null);
  }

  const moveBackToPool = (id: string) => {
    setItems((prev) => ({
      pool: [...prev.pool, id],
      ranked: prev.ranked.filter((item) => item !== id),
    }));
  };

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  function handleSubmit(values: ExplanationFormValues) {
    onSubmitAttempt(values);
  }

  return (
    <Card className="w-full mt-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Your Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {existingResponse && (
          <div className="mb-6 p-3 bg-secondary/50 border border-border rounded-md flex items-center text-sm text-muted-foreground">
            <Info className="h-5 w-5 mr-2 shrink-0" />
            <span>
              You have already submitted an explanation for this correlation.
              Your previous answers are shown below and cannot be changed.
            </span>
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="rankedExplanationIds"
              render={() => (
                <FormItem className="space-y-6">
                  <div>
                    <FormLabel className="text-lg font-medium">
                      Rank your top 3 explanations
                    </FormLabel>
                    <p className="text-sm text-muted-foreground mt-1">
                      Drag explanations from the pool into the slots below. You
                      must fill all 3 slots.
                    </p>
                  </div>

                  <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToWindowEdges]}
                  >
                    <div className="grid grid-cols-1 gap-6">
                      {/* Ranked Slots Area */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                          Your Ranking
                        </h3>
                        <div className="space-y-3 bg-secondary/20 p-4 rounded-xl border border-border/50">
                          <SortableContext
                            items={items.ranked}
                            strategy={verticalListSortingStrategy}
                          >
                            {/* FIX #1: Filled slots render SortableExplanationItem directly
                                (no DroppableSlot wrapper) so useSortable droppables don't
                                conflict with useDroppable — enables reordering within ranked */}
                            {[0, 1, 2].map((index) => {
                              const id = items.ranked[index];
                              const explanation = id
                                ? explanationsToList.find((e) => e.id === id)
                                : null;

                              if (explanation) {
                                return (
                                  <SortableExplanationItem
                                    key={explanation.id}
                                    id={explanation.id}
                                    text={explanation.text}
                                    index={index + 1}
                                    disabled={
                                      existingResponse !== null || isSubmitting
                                    }
                                    onRemove={() =>
                                      moveBackToPool(explanation.id)
                                    }
                                  />
                                );
                              }

                              return (
                                <DroppableSlot
                                  key={`slot-${index}`}
                                  index={index}
                                  id={`slot-${index}`}
                                  isFilled={false}
                                >
                                  <div className="h-full flex items-center justify-center text-muted-foreground/40 text-sm font-medium border-2 border-dashed border-border rounded-xl p-4 transition-colors hover:border-primary/20 hover:bg-muted/50">
                                    {index === 0
                                      ? "1st Choice"
                                      : index === 1
                                        ? "2nd Choice"
                                        : "3rd Choice"}
                                  </div>
                                </DroppableSlot>
                              );
                            })}
                          </SortableContext>
                        </div>
                      </div>

                      {/* Pool Area */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                          Available Explanations
                        </h3>
                        <div className="space-y-3 bg-muted/10 p-4 rounded-xl border border-border/50 min-h-[300px]">
                          <SortableContext
                            items={items.pool}
                            strategy={verticalListSortingStrategy}
                            id="pool"
                          >
                            <DroppableContainer id="pool-container">
                              {items.pool.map((id) => {
                                const explanation = explanationsToList.find(
                                  (e) => e.id === id,
                                );
                                if (!explanation) return null;
                                return (
                                  <SortableExplanationItem
                                    key={explanation.id}
                                    id={explanation.id}
                                    text={explanation.text}
                                    disabled={
                                      existingResponse !== null || isSubmitting
                                    }
                                  />
                                );
                              })}
                              {items.pool.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground italic text-sm">
                                  All items ranked! Drag back here if you change
                                  your mind.
                                </div>
                              )}
                            </DroppableContainer>
                          </SortableContext>
                        </div>
                      </div>
                    </div>

                    <DragOverlay dropAnimation={dropAnimation}>
                      {activeId ? (
                        <div className="opacity-90 scale-105 cursor-grabbing">
                          <SortableExplanationItem
                            id={activeId}
                            text={
                              explanationsToList.find((e) => e.id === activeId)
                                ?.text || ""
                            }
                            isOverlay
                          />
                        </div>
                      ) : null}
                    </DragOverlay>
                  </DndContext>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="explanationText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">
                    Provide your reasoning or any other insights (Optional):
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I believe this explanation is most likely because..."
                      className="resize-none min-h-[100px]"
                      {...field}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {existingResponse ? (
              <Button
                type="button"
                onClick={onNext}
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Next Correlation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting || form.formState.disabled}
                size="lg"
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Explanation"
                )}
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

interface SortableExplanationItemProps {
  id: string;
  text: string;
  index?: number;
  disabled?: boolean;
  onRemove?: () => void;
  isOverlay?: boolean;
}

function SortableExplanationItem({
  id,
  text,
  index,
  disabled,
  onRemove,
  isOverlay,
}: SortableExplanationItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isOverlay) {
    return (
      <div className="flex items-center space-x-3 p-4 rounded-xl border-2 shadow-2xl border-primary bg-card z-50">
        <div className="p-2">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        {index !== undefined && (
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0">
            {index}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-base font-medium leading-normal text-foreground break-words">
            {text}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex items-center space-x-3 p-4 rounded-xl border-2 transition-colors duration-200 bg-card group relative select-none",
        isDragging
          ? "opacity-30 border-dashed border-primary/50"
          : "shadow-sm border-border hover:border-primary/50",
        disabled
          ? "opacity-70 pointer-events-none grayscale-[0.2]"
          : "cursor-grab active:cursor-grabbing",
      )}
    >
      <div className="shrink-0 p-1 rounded-md hover:bg-accent/50 transition-colors">
        <GripVertical className="h-5 w-5 text-muted-foreground/60 group-hover:text-foreground" />
      </div>

      {index !== undefined && (
        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0">
          {index}
        </div>
      )}

      <div className="flex-1 min-w-0 pr-6">
        <p className="text-sm md:text-base font-medium leading-normal text-foreground break-words">
          {text}
        </p>
      </div>

      {onRemove && !disabled && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-2 right-2 p-1.5 text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function DroppableSlot({
  children,
  id,
  isFilled,
}: {
  children: React.ReactNode;
  id: string;
  index: number;
  isFilled: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative rounded-xl transition-all duration-200",
        isOver && !isFilled && "ring-2 ring-primary ring-offset-2 bg-primary/5",
      )}
    >
      {children}
    </div>
  );
}

function DroppableContainer({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className="space-y-3 min-h-[200px] h-full">
      {children}
    </div>
  );
}
