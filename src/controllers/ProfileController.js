const connection = require ('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        if (ong_id) {
            const incidents = await connection('incidents')
                .where('ong_id', ong_id)
                .select('*');
    
            return response.json(incidents);
        }
        return response.status(400).json({ error: 'Ong não informada'});
    }
}