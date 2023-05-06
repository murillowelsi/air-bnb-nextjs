'use client'

import useLoginModal from '@/app/hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import useRegisterModal from '../../hooks/useRegisterModal'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'

interface UserMenuProps {
  currentUser?: User | null
  image?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }
  }, [loginModal, currentUser])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
            hidden
            cursor-pointer
            rounded-full 
            px-4 
            py-3 
            text-sm 
            font-semibold 
            transition 
            hover:bg-neutral-100 
            md:block
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
          flex
          cursor-pointer
          flex-row
          items-center 
          gap-3 
          rounded-full 
          border-[1px] 
          border-neutral-200 
          p-4 
          transition 
          hover:shadow-md 
          md:px-2 
          md:py-1
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            right-0 
            top-12
            w-[40vw]
            overflow-hidden 
            rounded-xl 
            bg-white 
            text-sm 
            shadow-md 
            md:w-3/4
          "
        >
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem label="My trips" onClick={() => {}} />
                <MenuItem label="My favorites" onClick={() => {}} />
                <MenuItem label="My reservations" onClick={() => {}} />
                <MenuItem label="My properties" onClick={() => {}} />
                <MenuItem label="Airbnb your home" onClick={() => {}} />
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    signOut()
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
