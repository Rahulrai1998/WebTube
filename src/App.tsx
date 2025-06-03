import CategoryChips from "./components/CategoryChips"
import { categories } from "./data/home"
import PageHeader from "./layouts/PageHeader"


function App() {
  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto_1fr] flex-grow overflow-auto">
        <div>SIDE BAR</div>
        <div className="sticky top-0 bg-white z-10 pb-4">
          <CategoryChips categories={categories} />
        </div>
      </div>
    </div>
  )
}

export default App
