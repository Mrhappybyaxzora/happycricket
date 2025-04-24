"use client"

import { useEffect, useRef, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { mockCommentary } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface CommentaryProps {
  matchId: string
}

export default function Commentary({ matchId }: CommentaryProps) {
  const commentary = useMemo(() => mockCommentary[matchId] || [], [matchId])
  const commentaryRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the latest commentary
  useEffect(() => {
    if (commentaryRef.current) {
      commentaryRef.current.scrollTop = 0
    }
  }, [commentary])

  if (commentary.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No commentary available</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-background via-background/80 to-transparent h-4"></div>
      <div ref={commentaryRef} className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
        {commentary.map((item, index) => (
          <Card key={index} className={cn(index === 0 && "border-l-4 border-primary animate-pulse")}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="min-w-[60px] text-center">
                  <span
                    className={cn(
                      "inline-block px-2 py-1 rounded-full text-sm font-medium",
                      item.type === "boundary"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        : item.type === "wicket"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : item.type === "six"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
                    )}
                  >
                    {item.over}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{item.text}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Live indicator for the most recent commentary */}
        {commentary.length > 0 && (
          <div className="sticky bottom-4 flex justify-center">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-background border text-xs font-medium">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              Live
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

