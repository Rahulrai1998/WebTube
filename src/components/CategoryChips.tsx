import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CategoryChipsProps = {
  categories: string[];
  selectedCategory: number;
  onSelect: (category: number) => void;
};

const TRANSLATE_PIXELS = 200;
const CategoryChips = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryChipsProps) => {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [translate, setTranslate] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0].target as HTMLDivElement;
      if (container === null) return;
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [translate]);

  const handleTranslateRight = () => {
    setTranslate((value) => {
      const newTranslate = value - TRANSLATE_PIXELS;
      if (newTranslate <= 0) return 0;
      else return newTranslate;
    });
  };

  const handleTranslateLeft = () => {
    setTranslate((translate) => {
      if (containerRef.current) {
        let newTranslate = translate + TRANSLATE_PIXELS;
        const scrollWidth = containerRef.current.scrollWidth;
        const viewWidth = containerRef.current.clientWidth;
        // console.log("TEST", scrollWidth, " ", viewWidth, newTranslate, viewWidth + newTranslate, translate)
        if (newTranslate + viewWidth >= scrollWidth)
          return scrollWidth - viewWidth;
        return newTranslate;
      } else return translate;
    });
  };

  return (
    <div className="overflow-x-hidden relative" ref={containerRef}>
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories?.map((category, index) => (
          <Button
            onClick={() => onSelect(index)}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
            variant={selectedCategory === index ? "dark" : "default"}
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-full aspect-square w-auto p-1.5"
            onClick={handleTranslateRight}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-full aspect-square w-auto p-1.5"
            onClick={handleTranslateLeft}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryChips;
