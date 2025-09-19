import { useState } from "react"
import CategoryChips from "./components/CategoryChips"
import { categories, videos } from "./data/home"
import PageHeader from "./layouts/PageHeader"
import VideoGridItem from "./components/VideoGridItem"
import SideBar from "./layouts/SideBar"


function App() {
  const [selectedCategory, setSelectedCategory] = useState(0)

  const onSelect = (category: number) => {
    setSelectedCategory(category)

  }
  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto_1fr] flex-grow overflow-auto">
        <SideBar />
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4 ">
            <CategoryChips categories={categories} selectedCategory={selectedCategory} onSelect={onSelect} />
          </div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {videos?.map((video) => <VideoGridItem key={video.id} {...video} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
