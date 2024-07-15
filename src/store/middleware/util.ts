import { createAction } from '@reduxjs/toolkit'

export const sendMessage = createAction<{
  chat_id: string
  text: string
}>('sendMessage')

export const messageSeen = createAction<{
  chat_id: string
  message_id?: string
}>('messageSeen')

export const createChat = createAction('createChat')
