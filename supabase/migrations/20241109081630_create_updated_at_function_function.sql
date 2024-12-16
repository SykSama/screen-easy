create or replace function update_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function nanoid(size int default 21, alphabet text default '_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
returns text
language plpgsql
volatile
as $$
declare
    idBuilder text := '';
    i int := 0;
    bytes bytea;
    alphabetIndex int;
    mask int;
    step int;
begin
    mask := (2 << cast(floor(log(length(alphabet) - 1) / log(2)) as int)) - 1;
    step := cast(ceil(1.6 * mask * size / length(alphabet)) AS int);

    while true
        loop
            bytes := gen_random_bytes(size);
            while i < size
                loop
                    alphabetIndex := (get_byte(bytes, i) & mask) + 1;
                    if alphabetIndex <= length(alphabet) then
                        idBuilder := idBuilder || substr(alphabet, alphabetIndex, 1);
                        if length(idBuilder) = size then
                            return idBuilder;
                        end if;
                    end if;
                    i = i + 1;
                end loop;

            i := 0;
        end loop;
END
$$;