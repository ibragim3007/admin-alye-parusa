export enum MessageCrudType {
  created,
  deleted,
  edited,
}

export class FeedbackMessage {
  static createdMessage(value: string) {
    return `Успешно создан объект ${value}`;
  }
}
