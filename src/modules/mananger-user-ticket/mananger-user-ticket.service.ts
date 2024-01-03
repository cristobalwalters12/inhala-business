import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { firstValueFrom, timeout, retry } from 'rxjs';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { CreateManangerUserTicketDto } from './dto/create-mananger-user-ticket.dto';
import applicationConfig from '../../config/config';
import { UpdateManangerUserTicketDto } from './dto/update-mananger-user-ticket.dto';

@Injectable()
export class ManangerUserTicketService {
  constructor(
    @Inject(applicationConfig.KEY)
    private readonly appConfig: ConfigType<typeof applicationConfig>,
    private readonly httpService: HttpService,
  ) {}

  private generateHttpOptions(trace: string, params?: any) {
    return {
      headers: {
        apiKey: this.appConfig.apiKey,
        trace: trace,
      },
      params: params,
    };
  }

  private handleError(error: any, action: string) {
    console.log(error);
    throw new BadRequestException(
      `Error ${action} la persona : ${JSON.stringify(
        error.response?.data || error.message,
      )}`,
    );
  }

  async create(
    trace: string,
    createManangerUserTicketDto: CreateManangerUserTicketDto,
  ) {
    if (createManangerUserTicketDto.age >= +this.appConfig.businessLogic) {
      try {
        const response = await firstValueFrom(
          this.httpService
            .post(
              `${this.appConfig.dbBaseUrl}`,
              createManangerUserTicketDto,
              this.generateHttpOptions(trace),
            )
            .pipe(
              timeout(Number(this.appConfig.httpTimeout)),
              retry(Number(this.appConfig.retries)),
            ),
        );
        return response.data;
      } catch (error) {
        this.handleError(error, 'creando');
      }
    } else {
      throw new BadRequestException(
        `Error creando una persona : ${JSON.stringify('No es mayor de edad')}`,
      );
    }
  }

  async findAll(trace: string, paginationDto?: any): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(
            `${this.appConfig.dbBaseUrl}`,
            this.generateHttpOptions(trace, paginationDto),
          )
          .pipe(
            timeout(Number(this.appConfig.httpTimeout)),
            retry(Number(this.appConfig.retries)),
          ),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'listando las personas');
    }
  }

  async findOne(trace: string, term: string) {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(
            `${this.appConfig.dbBaseUrl}/${term}`,
            this.generateHttpOptions(trace),
          )
          .pipe(
            timeout(Number(this.appConfig.httpTimeout)),
            retry(Number(this.appConfig.retries)),
          ),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'listando las personas');
    }
  }

  async update(
    trace: string,
    id: string,
    updateManangerUserTicketDto: UpdateManangerUserTicketDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService
          .patch(
            `${this.appConfig.dbBaseUrl}/${id}`,
            updateManangerUserTicketDto,
            this.generateHttpOptions(trace),
          )
          .pipe(
            timeout(Number(this.appConfig.httpTimeout)),
            retry(Number(this.appConfig.retries)),
          ),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'actualizando');
    }
  }

  async remove(trace: string, id: string) {
    try {
      const response = await firstValueFrom(
        this.httpService
          .delete(
            `${this.appConfig.dbBaseUrl}/${id}`,
            this.generateHttpOptions(trace),
          )
          .pipe(
            timeout(Number(this.appConfig.httpTimeout)),
            retry(Number(this.appConfig.retries)),
          ),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'eliminando');
    }
  }
}
