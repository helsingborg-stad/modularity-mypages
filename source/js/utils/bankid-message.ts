export enum BankIdRecommendedUsereMessages {
  RFA1 = 'Starta BankID-appen',
  RFA2 = 'RFA2', // Not implemented
  RFA3 = 'Åtgärden avbruten. Försök igen.',
  RFA4 = 'En identifiering eller underskrift för det här personnumret är redan påbörjad. Försök igen.',
  RFA5 = 'Internt tekniskt fel. Försök igen.',
  RFA6 = 'Åtgärden avbruten.',
  RFA8 = 'BankID-appen svarar inte. Kontrollera att den är startad och att du har internetanslutning. Om du inte har något giltigt BankID kan du hämta ett hos din Bank. Försök sedan igen.',
  RFA9 = 'Skriv in din säkerhetskod i BankIDappen och välj Identifiera eller Skriv under.',
  RFA13 = 'Försöker starta BankID-appen.',
  RFA14_A = 'RFA14_A', // Not implemented
  RFA14_B = 'RFA14_B', // Not implemented
  RFA15_A = 'Söker efter BankID, det kan ta en liten stund. Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella identifieringen/underskriften i den här datorn. Om du har ett BankID-kort, sätt in det i kortläsaren. Om du inte har något BankID kan du hämta ett hos din internetbank.',
  RFA15_B = 'Söker efter BankID, det kan ta en liten stund. Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella identifieringen/underskriften i den här enheten. Om du inte har något BankID kan du hämta ett hos din internetbank.',
  RFA16 = 'Det BankID du försöker använda är för gammalt eller spärrat. Använd ett annat BankID eller hämta ett nytt hos din internetbank.',
  RFA17_A = 'BankID-appen verkar inte finnas i din dator eller telefon. Installera den och hämta ett BankID hos din internetbank. Installera appen från din appbutik eller https://install.bankid.com.',
  RFA17_B = 'Misslyckades att läsa av QR koden. Starta BankID-appen och läs av QR koden. Kontrollera att BankID-appen är uppdaterad. Om du inte har BankIDappen måste du installera den och hämta ett BankID hos din internetbank. Installera appen från din appbutik eller https://install.bankid.com',
  RFA18 = 'RFA18', // Not implemented
  RFA19 = 'RFA19', // Not implemented
  RFA20 = 'RFA20', // Not implemented
  RFA21 = 'Identifiering eller underskrift pågår. ',
  RFA22 = 'Okänt fel. Försök igen.',
}

export enum BankIdStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  COMPLETE = 'complete',
}

export enum BankIdHintCode {
  OUTSTANDING_TRANSACTION = 'outstandingTransaction',
  NO_CLIENT = 'noClient',
  USER_CANCEL = 'userCancel',
  EXPIRED_TRANSACTION = 'expiredTransaction',
  USER_SIGN = 'userSign',
  STARTED = 'started',
  CERTIFICATE_ERR = 'certificateErr',
  START_FAILED = 'startFailed',
}

export enum BankIdErrorCode {
  CANCELLED = 'cancelled',
  ALREADY_IN_PROGRESS = 'alreadyInProgress',
  REQUEST_TIMEOUT = 'requestTimeout',
  MAINTENANCE = 'maintenance',
  INTERNAL_ERROR = 'internalError',
}

export const getBankIdRecommendedUsereMessage = ({
  mobileDevice,
  authUsingQR,
  status,
  hintCode,
  errorCode,
}: {
  mobileDevice: boolean;
  authUsingQR: boolean;
  status: BankIdStatus;
  hintCode: BankIdHintCode;
  errorCode: BankIdErrorCode;
}): BankIdRecommendedUsereMessages => {
  if (
    (status === BankIdStatus.PENDING && hintCode === BankIdHintCode.OUTSTANDING_TRANSACTION) ||
    BankIdHintCode.NO_CLIENT
  ) {
    return BankIdRecommendedUsereMessages.RFA1;
  }

  if (errorCode === BankIdErrorCode.CANCELLED) {
    return BankIdRecommendedUsereMessages.RFA3;
  }

  if (errorCode === BankIdErrorCode.ALREADY_IN_PROGRESS) {
    return BankIdRecommendedUsereMessages.RFA4;
  }

  if (
    errorCode === BankIdErrorCode.REQUEST_TIMEOUT ||
    errorCode === BankIdErrorCode.MAINTENANCE ||
    errorCode === BankIdErrorCode.INTERNAL_ERROR
  ) {
    return BankIdRecommendedUsereMessages.RFA5;
  }

  if (status === BankIdStatus.FAILED && hintCode === BankIdHintCode.USER_CANCEL) {
    return BankIdRecommendedUsereMessages.RFA6;
  }

  if (status === BankIdStatus.FAILED && hintCode === BankIdHintCode.EXPIRED_TRANSACTION) {
    return BankIdRecommendedUsereMessages.RFA8;
  }

  if (status === BankIdStatus.PENDING && hintCode === BankIdHintCode.USER_SIGN) {
    return BankIdRecommendedUsereMessages.RFA9;
  }

  if (status === BankIdStatus.PENDING && hintCode === BankIdHintCode.OUTSTANDING_TRANSACTION) {
    return BankIdRecommendedUsereMessages.RFA13;
  }

  if (status === BankIdStatus.PENDING && hintCode === BankIdHintCode.STARTED && !mobileDevice) {
    return BankIdRecommendedUsereMessages.RFA15_A;
  }

  if (status === BankIdStatus.PENDING && hintCode === BankIdHintCode.STARTED && mobileDevice) {
    return BankIdRecommendedUsereMessages.RFA15_B;
  }

  if (status === BankIdStatus.FAILED && hintCode === BankIdHintCode.CERTIFICATE_ERR) {
    return BankIdRecommendedUsereMessages.RFA16;
  }

  if (status === BankIdStatus.FAILED && hintCode === BankIdHintCode.START_FAILED && !authUsingQR) {
    return BankIdRecommendedUsereMessages.RFA17_A;
  }

  if (status === BankIdStatus.FAILED && hintCode === BankIdHintCode.START_FAILED && authUsingQR) {
    return BankIdRecommendedUsereMessages.RFA17_B;
  }

  if (status === BankIdStatus.PENDING) {
    return BankIdRecommendedUsereMessages.RFA21;
  }

  return BankIdRecommendedUsereMessages.RFA22;
};
