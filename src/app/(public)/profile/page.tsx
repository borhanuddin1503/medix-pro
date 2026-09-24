import { getUser } from '@/app/utils/getUser'
import ProfileUpdate from '@/components/profile/profileUpdate';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  const userInfo = await getUser();
  console.log('user information from profile page', userInfo)


  return (
    <>
      <div>page</div>
      <ProfileUpdate initialData={userInfo!}></ProfileUpdate>
    </>
  )
}
