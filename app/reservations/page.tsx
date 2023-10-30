import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

     if (!currentUser) {
    return (
      <ClientOnly> 
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }
    // fetch the reservations

    const reservations = await getReservations({// pass deiffrent parameter
        authorId: currentUser.id // beacuse we want to pass load all the reservations in our listings that other people made
    });

   if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }

    return (
        <ClientOnly>
            <ReservationsClient 
            reservations={reservations}
            currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default ReservationsPage;