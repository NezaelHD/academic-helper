import {MessageDTO} from "@/components/DTO/MessageDTO.ts";
import {UserDTO} from "@/components/DTO/UserDTO.ts";

export interface ConversationDTO {
    id: number
    title: string
    messages: MessageDTO[]
    user: UserDTO
    deletedAt: Date
    createdAt: Date
    updatedAt: Date
    active?: boolean
}