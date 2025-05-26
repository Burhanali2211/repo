-- Add missing columns to what_we_do table
ALTER TABLE what_we_do ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE what_we_do ADD COLUMN IF NOT EXISTS image TEXT;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'what_we_do' 
ORDER BY ordinal_position;
