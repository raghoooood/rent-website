import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

interface Iparms {
    listingId? : string;
}

export async function POST(request: Request, {params}: {params:Iparms}){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const {listingId} = params;

    if (!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid ID');
    }
    let favoritId = [...(currentUser.favoriteIds || [])];
    favoritId.push(listingId);

    const user  = await prisma.user.update({
        where:{
            id: currentUser.id
        },
        data:{
            favoriteIds: favoritId
        }
    });

    return NextResponse.json(user);

}

export async function DELETE(request: Request, {params}: {params:Iparms}) {

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid ID');
    }

    let favoritId = [...(currentUser.favoriteIds || [])];

    favoritId = favoritId.filter((id) => id !== listingId);

    const user  = await prisma.user.update({
        where:{
            id: currentUser.id
        },
        data:{
            favoriteIds: favoritId
        }
    });

    return NextResponse.json(user);
    
}