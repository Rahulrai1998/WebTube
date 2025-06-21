import React from 'react'
import Button from './Button'
import { ChevronLeft } from 'lucide-react';

type CategoryChipsProps = {
    categories: string[];
    selectedCategory: number;
    onSelect: (category: number) => void
}

const CategoryChips = ({ categories, selectedCategory, onSelect }: CategoryChipsProps) => {
    return (
        <div className='overflow-x-hidden relative'>

            <div className='flex whitespace-nowrap gap-3 transition-transform w-[max-content]'>
                {categories?.map((category, index) => <Button onClick={() => onSelect(index)} className='py-1 px-3 rounded-lg whitespace-nowrap' variant={selectedCategory === index ? "dark" : "default"}>
                    {category}
                </Button>)}
            </div>
            <div className='absolute left-0 top-1/2 -translate-y-1/2'><Button variant={"ghost"} size={"icon"} className='h-full aspect-square w-auto p-1.5'><ChevronLeft /></Button></div>
        </div>
    )
}

export default CategoryChips