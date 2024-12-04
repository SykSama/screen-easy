-- Create function to get next display order
CREATE OR REPLACE FUNCTION next_display_order()
RETURNS TRIGGER AS $$
BEGIN
  NEW.display_order := COALESCE(
    (
      SELECT MAX(display_order) + 1
      FROM "collection_media"
      WHERE collection_id = NEW.collection_id
    ),
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically set display_order
CREATE TRIGGER set_display_order
  BEFORE INSERT ON "collection_media"
  FOR EACH ROW
  WHEN (NEW.display_order IS NULL)
  EXECUTE FUNCTION next_display_order();