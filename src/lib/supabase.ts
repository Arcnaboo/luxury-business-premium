import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://gpnwadkugnryoslqltmy.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijc4OGE4MjU5LTM4ODQtNDAzMC05MjM2LTdhMjkxYmMxMzk1MiJ9.eyJwcm9qZWN0SWQiOiJncG53YWRrdWducnlvc2xxbHRteSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY0OTI2NjUxLCJleHAiOjIwODAyODY2NTEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.GEqL859RFbAXAbpPym1SAyftmbDpgQXa5CTxMz9DL74';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };