import React from 'react'
import Button from './Button'



type CategoryChipsProps = {
    categories: string[]
}

const CategoryChips = ({ categories }: CategoryChipsProps) => {
    return (
        <div className='overflow-x-hidden relative'>
            <div className='flex whitespace-nowrap gap-3 transition-transform w-[max-content]'>
                {categories?.map((category) => <Button className='py-1 px-3 rounded-lg whitespace-nowrap' variant={"dark"}>
                    {category}
                </Button>)}
            </div>
        </div>
    )
}

export default CategoryChips