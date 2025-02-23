
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')
    const file = formData.get('file') as File | null

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    let filePath = null
    let fileName = null

    // Handle file upload if present
    if (file && file.size > 0) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        return new Response(
          JSON.stringify({ error: 'Failas per didelis. Maksimalus dydis yra 10MB' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }

      // Check file type
      const fileType = file.type
      if (!['application/pdf', 'image/jpeg', 'image/jpg'].includes(fileType)) {
        return new Response(
          JSON.stringify({ error: 'Netinkamas failo formatas. Galimi formatai: .jpg, .pdf' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }

      fileName = file.name
      const fileExt = fileName.split('.').pop()
      filePath = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('contact_attachments')
        .upload(filePath, file)

      if (uploadError) {
        return new Response(
          JSON.stringify({ error: 'Nepavyko įkelti failo' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }
    }

    // Save message to database
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        message,
        file_path: filePath,
        file_name: fileName
      })

    if (dbError) {
      return new Response(
        JSON.stringify({ error: 'Nepavyko išsaugoti žinutės' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ 
        message: 'Žinutė sėkmingai išsiųsta'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Įvyko klaida, bandykite dar kartą' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
