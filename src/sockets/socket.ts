import { config } from '@gateway/config';
import { gatewayCache } from '@gateway/redis/gateway.cache';
import { logger } from '@gateway/utils/logger.util';
import { IMessageDocument, IOrderDocument, IOrderNotification } from '@jobhunt-microservices/jobhunt-shared';
import { Server, Socket } from 'socket.io';
import { io, Socket as SocketClient } from 'socket.io-client';

const log = logger('gatewaySocket', 'debug');

let chatSocketClient: SocketClient;
let orderSocketClient: SocketClient;

export class SocketIOAppHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.chatSocketServiceIOConnections();
    this.orderSocketServiceIOConnections();
  }

  public listen(): void {
    this.chatSocketServiceIOConnections();
    this.orderSocketServiceIOConnections();
    this.io.on('connection', async (socket: Socket) => {
      socket.on('getLoggedInUsers', async () => {
        const response: string[] = await gatewayCache.getLoggedInUsersFromCache('loggedInUsers');
        this.io.emit('online', response);
      });

      socket.on('loggedInUsers', async (username: string) => {
        const response: string[] = await gatewayCache.saveLoggedInUserToCache('loggedInUsers', username);
        this.io.emit('online', response);
      });

      socket.on('removeLoggedInUser', async (username: string) => {
        const response: string[] = await gatewayCache.removeLoggedInUserFromCache('loggedInUsers', username);
        this.io.emit('online', response);
      });

      socket.on('category', async (category: string, username: string) => {
        await gatewayCache.saveUserSelectedCategory(`selectedCategories:${username}`, category);
      });
    });
  }

  private chatSocketServiceIOConnections(): void {
    chatSocketClient = io(`${config.MESSAGE_BASE_URL}`, {
      transports: ['websocket', 'polling'],
      secure: true
    });

    chatSocketClient.on('connect', () => {
      log.info('ChatService socket connected');
    });

    chatSocketClient.on('disconnect', (reason: SocketClient.DisconnectReason) => {
      log.log('error', 'ChatSocket disconnect reason:', reason);
      chatSocketClient.connect();
    });

    chatSocketClient.on('connect_error', (error: Error) => {
      log.log('error', 'ChatService socket connection error:', error);
      chatSocketClient.connect();
    });

    chatSocketClient.on('message_received', (data: IMessageDocument) => {
      this.io.emit('message_received', data);
    });

    chatSocketClient.on('message_updated', (data: IMessageDocument) => {
      this.io.emit('message_updated', data);
    });
  }

  private orderSocketServiceIOConnections(): void {
    orderSocketClient = io(`${config.ORDER_BASE_URL}`, {
      transports: ['websocket', 'polling'],
      secure: true
    });

    orderSocketClient.on('connect', () => {
      log.info('OrderService socket connected');
    });

    orderSocketClient.on('disconnect', (reason: SocketClient.DisconnectReason) => {
      log.log('error', 'OrderSocket disconnect reason:', reason);
      orderSocketClient.connect();
    });

    orderSocketClient.on('connect_error', (error: Error) => {
      log.log('error', 'OrderService socket connection error:', error);
      orderSocketClient.connect();
    });

    orderSocketClient.on('order_notification', (order: IOrderDocument, notification: IOrderNotification) => {
      this.io.emit('order_notification', order, notification);
    });
  }
}
