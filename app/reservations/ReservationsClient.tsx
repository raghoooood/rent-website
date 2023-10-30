'use client'
import React from 'react'
import {toast} from 'react-hot-toast'
import axios from 'axios'

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { safeReservation, SafeUser } from "@/app/types"
;
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface ReservationClientProps {
  reservations: safeReservation[];
  currentUser?: SafeUser | null; 
}

const ReservationsClient :  React.FC<ReservationClientProps> = ({
  reservations,
  currentUser}) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancle = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservations canclled');
      router.refresh();
    }).catch(() => {
      toast.error('Somthing went wrong');
    })
    .finally(() => {
      setDeletingId('');
    })
  },[router])

  return (
    <Container>
      <Heading 
      title='Reservation'
      subtitle='Booking on your properties'
      />

      <div className='
      mt-10
      grid
      grid-cols-1
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8 
      '>

          {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancle}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
          ))}

      </div>
    </Container>
  )
}

export default ReservationsClient