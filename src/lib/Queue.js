// configuracao para criar as filas para cada tipo de email
// cancelamento e agendamento e etc...

import Bee from 'bee-queue';
import CancellationMail from '../app/Jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  // meotod para iniciar a fila
  init() {
    // percorre todos os jobs acessando o key e o metodo handle e criando a fila
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          // acessa o redis que acessa e armazena valores do BD
          redis: redisConfig,
        }),
        // metodo que processa a fila
        handle,
      };
    });
  }

  // metodo para incluir os novos jobs na queues(filas)
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // metodo para processar os jobs em background e tempo real
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
