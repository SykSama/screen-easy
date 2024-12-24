CREATE OR REPLACE VIEW collection_with_medias_v AS
SELECT
    c.id AS id,
    c.name AS name,
    c.description AS description,
    c.is_active,
    c.organization_id,
    c.created_at AS created_at,
    c.updated_at AS updated_at,
    COALESCE(json_agg(
        CASE WHEN m.id IS NOT NULL THEN
            json_build_object(
                'id', m.id,
                'name', m.name,
                'description', m.description,
                'type', m.type,
                'status', m.status,
                'path', m.path,
                'metadata', m.metadata,
                'video_duration', m.video_duration,
                'width', m.width,
                'height', m.height,
                'file_size', m.file_size,
                'created_at', m.created_at,
                'updated_at', m.updated_at,
                'duration', cm.duration,
                'display_order', cm.display_order,
                'resize_mode', cm.resize_mode
            )
        END
        ORDER BY cm.display_order
    ) FILTER (WHERE m.id IS NOT NULL), '[]') AS medias
FROM
    collections c
LEFT JOIN
    collection_media cm ON c.id = cm.collection_id
LEFT JOIN
    media m ON cm.media_id = m.id
GROUP BY
    c.id;