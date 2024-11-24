const agenda = require('../agenda');

exports.saveFlow = async (req, res) => {
    const { nodes, edges } = req.body;

    nodes.forEach(async (node) => {
        if (node.type === 'coldEmail') {
            const { email, subject, text } = node.data;
            const delayNode = edges.find((edge) => edge.source === node.id && nodes.find((n) => n.id === edge.target && n.type === 'waitDelay'));

            const delay = delayNode ? delayNode.data.delay : 0;
            await agenda.schedule(`in ${delay} minutes`, 'send email', { to: email, subject, text });
        }
    });

    res.status(200).json({ message: 'Flow saved and emails scheduled' });
};
