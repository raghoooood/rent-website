'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons"
import qs from  'query-string'
interface CategoryBoxProps{
    icon: IconType;
    label: string;
    selected?: boolean;
}
const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        // define empty query
        let currentQuery = {};
// look for the current parms 
        if(params){
            currentQuery = qs.parse(params.toString()); // define it as object not a string 
        }
// seprate that query & add new category to them
        const updatedQuery: any = {
            ...currentQuery,
            category: label, // for url
        }
        // check if the category is selected  

        if(params?.get('category') === label){
            delete updatedQuery.category; // if checked , remove it from updated query beacouse we want to deselected 
        }
// generate new url string 
        const url = qs.stringifyUrl({
            url: '/',// path name
            query: updatedQuery // new path name
        }, { skipNull: true});

        router.push(url);
    },[label, params, router])


  return (
    <div
    onClick={handleClick}
    className={
  `  flex
    flex-col
    items-center
    justify-center
    gap-2
    border-b-2
    hover:text-neutral-800
    transition
    cursor-pointer
    
    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}>

        <Icon size={26} />
        <div className="font-medium text-sm">
            {label}
        </div>
        
    </div>
  )
}

export default CategoryBox