import { prismaClient } from "../../prisma";
import { FeedbacksReposiry, FeedbackCreateData } from "../feedbacks-repository";

export class PrismaFeedbackRepository implements FeedbacksReposiry {
  async create ({ type, comment, screenshot }: FeedbackCreateData) {
    await prismaClient.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  }
}
