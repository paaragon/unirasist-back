import { Response, Request, NextFunction } from 'express';
import { WatsonService } from '../../services/watson.service';
import actionsService from '../../services/actions.service';
import HttpException from '../exceptions/HttpException';
import responseLiteralsService from '../../services/responseLiterals.service';
import assistantMessagesService from '../../services/assistantMessages.service';
import { MessageResponse } from '../../models/messge/MessageResponse';
import { CognitiveEngineResponse } from '../../models/CognitiveEngineResponse';
import { Message } from '../../models/messge/Message';

export default {
  sendNewMessage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let input = req.body.input.text;
      const context = req.body.context;

      input = cleanInput(input);

      let response: CognitiveEngineResponse = await WatsonService.sendMessage(input, context);
      if (!response) {
        return next(new HttpException(500, 'Error al contactar con watson assistant'));
      }

      response = await actionsService.handleResponseActions(input, response);

      const result = await buildResponse(response);

      assistantMessagesService.saveResponse(input, response, result);

      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

function cleanInput(input: string): string {
  return input;
}

async function buildResponse(response: CognitiveEngineResponse): Promise<MessageResponse> {
  const output: Message[] = await responseLiteralsService.getResponse(response.output.text, response.context);

  return {
    context: response.context,
    output,
  };
}
