import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectOption";
const Sort = () => {
  return (
    <>
    <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Sort By" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
      <SelectGroup>
          <SelectItem value="apple">Distance from you</SelectItem>
          <SelectItem value="banana">Rating High to Low</SelectItem>
          <SelectItem value="blueberry">Rating Low to High</SelectItem>
          <SelectItem value="grapes">Price High to Low</SelectItem>
          <SelectItem value="pineapple">Price Low to High</SelectItem>
        </SelectGroup>
      </SelectGroup>
    </SelectContent>
  </Select>
  </>
  )
}

export default Sort