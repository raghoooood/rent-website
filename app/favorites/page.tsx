import getCurrentUser from "../actions/getCurrentUser";
import getFavoritesListing from "../actions/getFavoritesListing";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {

    const listings = await getFavoritesListing();
    const currentUser = await getCurrentUser();

   if(listings.length === 0){
       return(
           <ClientOnly>
               <EmptyState
               title="No favorites found"
               subtitle="Looks like you have no favorite listing"
               />
           </ClientOnly>
       )
   }
   return (
       <ClientOnly>
           <FavoritesClient 
           listings={listings}
           currentUser={currentUser}
           />
       </ClientOnly>
   )
}

export default ListingPage;
