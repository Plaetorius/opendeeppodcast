"use client"

import * as React from "react"
import { Check, ChevronDown, Tag, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "ui/sheet"
import { Badge } from "ui/badge"
import { ScrollArea } from "ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/tabs"
import { Input } from "ui/input"

export type ItemType = {
  id: string
  name: string
  categories: string[]
}

export type CategoryType = {
  id: string
  name: string
}

interface MultiSelectProps {
  id: string
  items: ItemType[]
  categories: CategoryType[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  id,
  items,
  categories,
  selected,
  onChange,
  placeholder = "Select items...",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("all")

  const handleSelect = (itemId: string) => {
    onChange(selected.includes(itemId) ? selected.filter((id) => id !== itemId) : [...selected, itemId])
  }

  const handleRemove = (itemId: string) => {
    onChange(selected.filter((id) => id !== itemId))
  }

  // Filter items based on search query
  const filteredItems = React.useMemo(
    () => items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [items, searchQuery],
  )

  // Get selected items for display
  const selectedItems = React.useMemo(() => items.filter((item) => selected.includes(item.id)), [items, selected])

  // Get items by category for the grouped view
  const getItemsByCategory = React.useCallback(
    (categoryId: string) => {
      return filteredItems.filter((item) => categoryId === "all" || item.categories.includes(categoryId))
    },
    [filteredItems],
  )

  return (
    <div className="w-full" id={id}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full justify-between h-auto min-h-[3rem] py-2 px-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-normal">
                {selected.length > 0
                  ? `${selected.length} item${selected.length > 1 ? "s" : ""} selected`
                  : placeholder}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] p-0 flex flex-col">
          <SheetDescription className="sr-only">
            Select tags for your podcast
          </SheetDescription>
          <div className="flex flex-col h-full">
            <SheetHeader className="px-4 pt-4 pb-2 flex-shrink-0">
              <SheetTitle>Select Items</SheetTitle>
              <div className="mt-2">
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
            </SheetHeader>

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex flex-col flex-grow overflow-hidden"
            >
              <div className="px-4 py-2 border-b flex-shrink-0">
                <ScrollArea orientation="horizontal" className="w-full pb-2">
                  <TabsList className="inline-flex h-9 w-auto">
                    <TabsTrigger value="all" className="px-3">
                      All
                    </TabsTrigger>
                    {categories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id} className="px-3">
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </ScrollArea>
              </div>

              <div className="flex-grow overflow-hidden">
                {/* All items tab */}
                <TabsContent value="all" className="h-full m-0 p-0 data-[state=active]:flex flex-col">
                  <ScrollArea className="flex-grow">
                    <div className="p-4 space-y-1">
                      {getItemsByCategory("all").map((item) => (
                        <ItemButton
                          key={item.id}
                          item={item}
                          categories={categories}
                          isSelected={selected.includes(item.id)}
                          onSelect={() => handleSelect(item.id)}
                        />
                      ))}
                      {getItemsByCategory("all").length === 0 && (
                        <div className="py-6 text-center text-muted-foreground">No items found</div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Category tabs */}
                {categories.map((category) => (
                  <TabsContent
                    key={category.id}
                    value={category.id}
                    className="h-full m-0 p-0 data-[state=active]:flex flex-col"
                  >
                    <ScrollArea className="flex-grow">
                      <div className="p-4 space-y-1">
                        {getItemsByCategory(category.id).map((item) => (
                          <ItemButton
                            key={item.id}
                            item={item}
                            categories={[]}
                            isSelected={selected.includes(item.id)}
                            onSelect={() => handleSelect(item.id)}
                          />
                        ))}
                        {getItemsByCategory(category.id).length === 0 && (
                          <div className="py-6 text-center text-muted-foreground">No items found in this category</div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ))}
              </div>
            </Tabs>

            <div className="p-4 border-t flex-shrink-0">
              <Button className="w-full" onClick={() => setOpen(false)}>
                Done ({selected.length})
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Selected items display */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedItems.map((item) => (
            <Badge
              key={item.id}
              variant="secondary"
              className="bg-secondary/50 text-secondary-foreground pr-0.5 py-1.5"
            >
              <span className="ml-1">{item.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 ml-1 hover:bg-secondary/80 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove(item.id)
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {item.name}</span>
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

interface ItemButtonProps {
  item: ItemType
  categories: CategoryType[]
  isSelected: boolean
  onSelect: () => void
}

function ItemButton({ item, categories, isSelected, onSelect }: ItemButtonProps) {
  // Only show categories if they're provided (for the "All" tab)
  const showCategories = categories.length > 0

  // Get category names for this item
  const categoryNames = showCategories
    ? categories.filter((cat) => item.categories.includes(cat.id)).map((cat) => cat.name)
    : []

  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-between w-full p-3 rounded-md text-left",
        "transition-colors hover:bg-secondary/50",
        isSelected ? "bg-secondary/50" : "bg-background",
      )}
      onClick={onSelect}
    >
      <div className="flex flex-col">
        <span className="font-medium">{item.name}</span>
        {showCategories && categoryNames.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {categoryNames.map((name) => (
              <span key={name} className="inline-flex items-center text-xs text-muted-foreground">
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex items-center justify-center h-5 w-5 rounded-full border",
          isSelected ? "bg-primary border-primary" : "bg-transparent border-muted-foreground/30",
        )}
      >
        {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
      </div>
    </button>
  )
}

