export enum MessageCrudType {
  created,
  deleted,
  edited,
}

export class FeedbackMessage {
  static createdMessage(value: string) {
    return `Успешно создан объект ${value}`;
  }

  static updatedMessage(value: string) {
    return `Успешно изменен объект ${value}`;
  }

  static deleteMessage(value: string, str?: string) {
    if (str) return `Успешно удален ${value} – ${str}`;
    return `Успешно удален объект ${value}`;
  }
}
