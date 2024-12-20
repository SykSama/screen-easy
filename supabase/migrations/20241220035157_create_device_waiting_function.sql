create or replace function create_waiting_device_from_device_information(
    device_info json
)
returns json
language plpgsql
security definer
as $$
declare
    device_information_id uuid;
    waiting_device record;
begin
    insert into public.device_information(
        device_brand,
        device_name,
        device_os,
        device_os_version,
        screen_width,
        screen_height,
        screen_scale
    )
    values (
        device_info->>'device_brand',
        device_info->>'device_name',
        device_info->>'device_os',
        device_info->>'device_os_version',
        (device_info->>'screen_width')::double precision,
        (device_info->>'screen_height')::double precision,
        (device_info->>'screen_scale')::double precision
    )
    returning id into device_information_id;

    -- Insert waiting device and get generated values
    insert into public.device_waiting(
        device_information_id
    )
    values (
        device_information_id
    )
    returning * into waiting_device;

    -- Return the generated IDs
    return jsonb_build_object(
        'id', waiting_device.id,
        'nanoid', waiting_device.nanoid
    );
end;
$$;
