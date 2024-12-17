## Makefile syntax: https://www.gnu.org/software/make/manual/make.html

.EXPORT_ALL_VARIABLES: #exports all variables to child processes by default.
.PHONY: test

help:  ## print list of commands
	@egrep -h '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ':.*?## '}; {printf '\033[36m%-30s\033[0m %s\n', $$1, $$2}'

reset:
	@supabase db reset
	@pnpm supabase:gen

gen:
	@pnpm supabase:gen

clean:
	@pnpm clean