import {ConversationDTO} from "@/components/DTO/ConversationDTO.ts";

export interface MessageDTO {
    id: number
    content: string
    conversation: ConversationDTO
    type: Type
    createdAt: Date
}