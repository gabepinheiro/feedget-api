import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

// spies -espiões
const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', ()=> {
  it('should be able submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Novo Feedback',
      screenshot: 'data:image/png;base64 54asd4h5a64d5sd'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled()
    expect(sendMailSpy).toBeCalled()
  })

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Novo Feedback',
      screenshot: 'data:image/png;base64 54asd4h5a64d5sd'
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64 54asd4h5a64d5sd'
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Novo Feedback',
      screenshot: 'test.jpg'
    })).rejects.toThrow();
  })
})
