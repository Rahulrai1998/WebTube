import React, { useState } from 'react'
import Button from './Button'
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CategoryChipsProps = {
    categories: string[];
    selectedCategory: number;
    onSelect: (category: number) => void
}

const CategoryChips = ({ categories, selectedCategory, onSelect }: CategoryChipsProps) => {
    const [isLeftVisible, setIsLeftVisible] = useState(false)
    const [isRightVisible, setIsRightVisible] = useState(false)
    const [translate, setTranslate] = useState(0)

    const handleTranslateRight = () => {
        setTranslate(value => {
            const newTranslate = value - 200;
            if (newTranslate <= 0) return 0
            else
                return newTranslate
        })
    }

    return (
        <div className='overflow-x-hidden relative'>
            <div className='flex whitespace-nowrap gap-3 transition-transform w-[max-content]' style={{ transform: `translateX(-${translate}px)` }}>
                {categories?.map((category, index) => <Button onClick={() => onSelect(index)} className='py-1 px-3 rounded-lg whitespace-nowrap' variant={selectedCategory === index ? "dark" : "default"}>
                    {category}
                </Button>)}
            </div>
            {isLeftVisible && <div className='absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full'>
                <Button variant={"ghost"} size={"icon"} className='h-full aspect-square w-auto p-1.5' onClick={handleTranslateRight}>
                    <ChevronLeft />
                </Button>
            </div>}
            {isRightVisible && <div className='absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end'>
                <Button variant={"ghost"} size={"icon"} className='h-full aspect-square w-auto p-1.5'>
                    <ChevronRight />
                </Button>
            </div>}

        </div>
    )
}

export default CategoryChips