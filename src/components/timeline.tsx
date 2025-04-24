import { Card, CardContent } from "@/components/ui/card"
import { Match } from "@/lib/api"
import { mockTimeline } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface TimelineProps {
  match: Match
}

export default function Timeline({ match }: TimelineProps) {
  const timeline = mockTimeline[match.match_id] || []

  if (timeline.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Timeline not available</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
      <div className="space-y-8 relative pl-10">
        {timeline.map((event, index) => (
          <div key={index} className="relative">
            <div
              className={cn(
                "absolute -left-10 mt-1.5 h-4 w-4 rounded-full border",
                event.type === "wicket"
                  ? "bg-red-500 border-red-500"
                  : event.type === "boundary"
                    ? "bg-blue-500 border-blue-500"
                    : event.type === "six"
                      ? "bg-purple-500 border-purple-500"
                      : event.type === "milestone"
                        ? "bg-amber-500 border-amber-500"
                        : "bg-primary border-primary",
              )}
            ></div>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {event.time} • {event.over}
                  </p>
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      event.type === "wicket"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        : event.type === "boundary"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : event.type === "six"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                            : event.type === "milestone"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
                    )}
                  >
                    {event.type.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
                <p className="mt-2">{event.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

