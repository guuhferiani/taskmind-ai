/**
 * Serviço de Integração com a API do Google Gemini (Google AI Studio).
 * Utiliza requisições HTTP REST diretas, demonstrando fundamentos de consumo de APIs
 * e engenharia de prompts com saídas estruturadas em JSON.
 */

const GEMINI_MODEL = 'gemini-1.5-flash'
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

/**
 * Envia o objetivo/meta do usuário para o Gemini e retorna uma lista de subtarefas acionáveis.
 * Aplica diretrizes de IA Responsável e tratamento anti-alucinação.
 */
export async function breakdownGoalWithGemini(goalTitle, goalDescription = '') {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey || apiKey === 'sua_chave_do_google_ai_studio_aqui') {
    throw new Error(
      'Chave da API do Gemini não configurada. Adicione sua chave gratuita do Google AI Studio no arquivo .env (VITE_GEMINI_API_KEY).'
    )
  }

  // Engenharia de Prompts com Instruções de Sistema e Restrições Rígidas de Formato
  const systemInstruction = 
    "Você é um especialista em produtividade e divisão de metas do aplicativo TaskMind do SENAI SP.\n" +
    "Sua função é receber o objetivo de uma meta e decompô-la em 3 a 5 subtarefas práticas, diretas e acionáveis.\n" +
    "DIRETRIZ DE IA RESPONSÁVEL: Recuse educadamente qualquer conteúdo violento, ilegal, com discurso de ódio ou prejudicial retornando um array vazio [].\n" +
    "REGRA ESTRITA DE FORMATO: Responda ESTRITAMENTE em formato JSON puro, sem caracteres extras, sem markdown ```json e sem explicações.\n" +
    "Exemplo de saída esperada:\n" +
    '[{"title": "Primeiro passo prático"}, {"title": "Segundo passo prático"}]'

  const userPrompt = `Meta principal: "${goalTitle}". ${goalDescription ? `Contexto adicional: "${goalDescription}"` : ''}`

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: systemInstruction },
          { text: userPrompt }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.4, // Baixa temperatura para reduzir alucinações e focar em respostas objetivas
      topP: 0.8,
      maxOutputTokens: 600
    }
  }

  const endpoint = `${BASE_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const errorMessage = errorData.error?.message || response.statusText
    console.error('[Gemini API] Erro na requisição:', errorMessage)

    if (response.status === 429) {
      throw new Error('Limite de requisições por minuto atingido no plano gratuito. Aguarde alguns segundos.')
    }
    throw new Error(`Falha na comunicação com o Gemini: ${errorMessage}`)
  }

  const data = await response.json()
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

  // Sanitização anti-alucinação: remove blocos ```json ou ``` caso o modelo os inclua
  const cleanedText = rawText
    .replace(/^```json/im, '')
    .replace(/^```/im, '')
    .replace(/```$/im, '')
    .trim()

  try {
    const parsed = JSON.parse(cleanedText)
    if (Array.isArray(parsed)) {
      return parsed.map((item, index) => ({
        id: `gemini-${Date.now()}-${index}`,
        title: item.title || item.task || String(item),
        done: false
      }))
    }
    return []
  } catch (parseError) {
    console.warn('[Gemini API] Falha no parse JSON. Conteúdo bruto retornado:', rawText)
    throw new Error('A IA gerou uma resposta fora do formato estruturado. Tente novamente.')
  }
}
