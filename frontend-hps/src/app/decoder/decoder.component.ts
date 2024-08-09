
import { Component } from '@angular/core';
import { IsoMessageService } from '../iso-message.service';

@Component({
  selector: 'app-decoder',
  templateUrl: './decoder.component.html',
  styleUrls: ['./decoder.component.css']
})
export class DecoderComponent {
  hexMessage: string = '';
  decodedMessage: any;

  constructor(private isoMessageService: IsoMessageService) {}

  decodeMessage() {
    this.isoMessageService.decodeMessage(this.hexMessage).subscribe(
      (data: any) => {
        this.decodedMessage = data;
      },
      (error: any) => {
        console.error('Error decoding message:', error);
      }
    );
  }

  get orderedDecodedMessage() {
    const order = [
      "Bitmap",
      "MessageType",
      "Transmissiondatetime",
      "SystemtraceauditnumberSTAN",
      "Timelocaltransactionhhmmss",
      "FunctioncodeISO85831993NetworkInternationalidentifierNII",
      "Pointofserviceconditioncode",
      "Forwardinginstitutionidentificationcode",
      "Retrievalreferencenumber",
      "Responsecode",
      "Messageauthenticationcode"
    ];

    const labelMap: { [key: string]: string } = {
      "Bitmap": "Bitmap",
      "MessageType": "M.T.I",
      "Transmissiondatetime": "Date et heure de transmission",
      "SystemtraceauditnumberSTAN": "Numéro d’audit du système de suivi",
      "Timelocaltransactionhhmmss": "Date et heure locale de la transaction",
      "FunctioncodeISO85831993NetworkInternationalidentifierNII": "Code fonction",
      "Pointofserviceconditioncode": "Code raison du message",
      "Forwardinginstitutionidentificationcode": "Code d’identification",
      "Retrievalreferencenumber": "Numéro de référence de recouvrement",
      "Responsecode": "Code action",
      "Messageauthenticationcode": "Code d’authentification du message"
    };

    const elementMap: { [key: string]: string } = {
      "MessageType": "",
      "Bitmap": "001",

      "Transmissiondatetime": "007",
      "SystemtraceauditnumberSTAN": "011",
      "Timelocaltransactionhhmmss": "012",
      "FunctioncodeISO85831993NetworkInternationalidentifierNII": "024",
      "Pointofserviceconditioncode": "025",
      "Forwardinginstitutionidentificationcode": "033",
      "Retrievalreferencenumber": "037",
      "Responsecode": "039",
      "Messageauthenticationcode": "128"
    };

    const lengthMap: { [key: string]: string } = {
      "MessageType": "004",
      "Transmissiondatetime": "010",
      "SystemtraceauditnumberSTAN": "006",
      "Timelocaltransactionhhmmss": "012",
      "FunctioncodeISO85831993NetworkInternationalidentifierNII": "003",
      "Pointofserviceconditioncode": "004",
      "Forwardinginstitutionidentificationcode": "006",
      "Retrievalreferencenumber": "012",
      "Responsecode": "003",
      "Messageauthenticationcode": " 008"

    };

    if (!this.decodedMessage) return [];

    return order.map(key => ({
      key: labelMap[key] || key,
      value: this.decodedMessage[key],
      element: elementMap[key] || '',
      length: lengthMap[key] || ''
    }));
  }
}
