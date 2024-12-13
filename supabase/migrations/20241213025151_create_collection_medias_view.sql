CREATE OR REPLACE VIEW collection_with_medias_v AS
SELECT
    c.id AS id,
    c.name AS name,
    c.description AS description,
    c.is_active,
    c.created_at AS created_at,
    c.updated_at AS updated_at,
    json_agg(
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
            'display_order', cm.display_order
        )
        ORDER BY cm.display_order
    ) AS medias
FROM
    collections c
LEFT JOIN
    collection_media cm ON c.id = cm.collection_id
LEFT JOIN
    media m ON cm.media_id = m.id
GROUP BY
    c.id;