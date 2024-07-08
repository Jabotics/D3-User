import LiveUpdates from "@/components/live-updates"

const ScoreboardPage = () => {
  return (
    <div className="w-screen h-[90vh] overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <LiveUpdates />
      </div>
    </div>
  )
}

export default ScoreboardPage