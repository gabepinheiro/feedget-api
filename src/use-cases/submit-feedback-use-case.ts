import { FeedbacksReposiry } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepostiry: FeedbacksReposiry
  ) {}

  async execute(request: SubmitFeedbackUseRequest) {
    const { type, comment, screenshot } = request

    await this.feedbacksRepostiry.create({
      type,
      comment,
      screenshot
    })
  }
}
