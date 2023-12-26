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

  async create(
    trace: string,
    createManangerUserTicketDto: CreateManangerUserTicketDto,
  ) {
    const httpOptions = {
      headers: {
        apiKey: this.appConfig.apiKey,
        trace: trace,
      },
    };
    if (createManangerUserTicketDto.edad > 18) {
      try {
        const response = await firstValueFrom(
          this.httpService
            .post(
              `${this.appConfig.dbBaseUrl}`,
              createManangerUserTicketDto,
              httpOptions,
            )
            .pipe(
              timeout(Number(this.appConfig.httpTimeout)),
              retry(Number(this.appConfig.retries)),
            ),
        );
        return response.data;
      } catch (error) {
        console.log(error);
        throw new BadRequestException(
          `Error creando una persona : ${JSON.stringify(
            error.response?.data || error.message,
          )}`,
        );
      }
    } else {
      throw new BadRequestException(
        `Error creando una persona : ${JSON.stringify('No es mayor de edad')}`,
      );
    }
  }

  async findAll(trace: string) {
    const httpOptions = {
      headers: {
        apiKey: this.appConfig.apiKey,
        trace: trace,
      },
    };
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`${this.appConfig.dbBaseUrl}`, httpOptions)
          .pipe(
            timeout(Number(this.appConfig.httpTimeout)),
            retry(Number(this.appConfig.retries)),
          ),
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        `Error listando las personas : ${JSON.stringify(
          error.response?.data || error.message,
        )}`,
      );
    }
  }
  async findOne(trace: string, term: string) {
    const httpOptions = {
      headers: {
        apiKey: this.appConfig.apiKey,
        trace: trace,
      },
    };
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`${this.appConfig.dbBaseUrl}/${term}`, httpOptions)
          .pipe(
            timeout(Number(this.appConfig.httpTimeout)),
            retry(Number(this.appConfig.retries)),
          ),
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        `Error listando las personas : ${JSON.stringify(
          error.response?.data || error.message,
        )}`,
      );
    }
  }

  async update(
    trace: string,
    id: string,
    updateManangerUserTicketDto: UpdateManangerUserTicketDto,
  ) {
    const httpOptions = {
      headers: {
        apiKey: this.appConfig.apiKey,
        trace: trace,
      },
    };
    try {
      const response = await firstValueFrom(
        this.httpService
          .patch(
            `${this.appConfig.dbBaseUrl}/${id}`,
            updateManangerUserTicketDto,
            httpOptions,
          )
          .pipe(
            timeout(Number(this.appConfig.httpTimeout)),
            retry(Number(this.appConfig.retries)),
          ),
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        `Error actualizando la persona : ${JSON.stringify(
          error.response?.data || error.message,
        )}`,
      );
    }
  }
  async remove(trace: string, id: string) {
    const httpOptions = {
      headers: {
        apiKey: this.appConfig.apiKey,
        trace: trace,
      },
    };
    try {
      const response = await firstValueFrom(
        this.httpService
          .delete(`${this.appConfig.dbBaseUrl}/${id}`, httpOptions)
          .pipe(
            timeout(Number(this.appConfig.httpTimeout)),
            retry(Number(this.appConfig.retries)),
          ),
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        `Error eliminando la persona : ${JSON.stringify(
          error.response?.data || error.message,
        )}`,
      );
    }
  }
}
