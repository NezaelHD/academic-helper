import {ConversationDTO} from "@/components/DTO/ConversationDTO.ts";

export interface UserDTO {
    id: number
    username: string
    email: string
    salt: string
    hash: Date
    role: Roles
    token: String
    profileImage: string
    conversations: ConversationDTO[]
    createdAt: Date
    updatedAt: Date
}