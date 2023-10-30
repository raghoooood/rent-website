import prisma from "@/app/libs/prismadb";


interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}


export default async function getReservations(params:IParams) {

    try{
    const {listingId, userId, authorId} =  params;

    const query: any ={};
// depending on what we send wither listingid , userid , authorid  we can query by diffrent things
// we can find all the reservation for this singal listing that we looking at 

    if(listingId){
         query.listingId = listingId;
    }

    if(userId){
         query.userId = userId;
    }
// in this case we search for all the reservation that other users made for our listing
    if(authorId){
      query.listing = { userId: authorId };
    }

    // write the fetch function

  const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservation = reservations.map((reservation) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
            ...reservation.listing,
            createdAt: reservation.listing.createdAt.toISOString()
        },
    }));

    return safeReservation;

    // end of try
}catch (error: any) {
    throw new Error(error);
  }

}