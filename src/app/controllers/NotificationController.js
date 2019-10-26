// Controler das notificacoes para oa provider

import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    // verificar se o provider_id e um provedor de servico
    const checkisProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkisProvider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notification' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    // marca notificacao como lida pegando o _id passado na requisicao
    // exemplo: {{ base_url  }}/notifications/5db4a1d9a4b15911e1b0a82f
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
