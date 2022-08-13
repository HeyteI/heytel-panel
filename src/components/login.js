export function LoginContainer() {
    return (
        <div className="Login" class="flex items-center text-center justify-center">
            <form class="px-8 pt-6 pb-8 mb-4 h-96 w-96">
                <div class="box-border h-64 w-96 p-4 pt-30 border-2 rounded-md border-violet-700 w-full max-w-xs">
                    <h1 class="font-bold text-xl pb-3">Logowanie do systemu</h1>
                    <div class="w-full max-w-xs">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-light mb-2" for="username">
                                Login
                            </label>
                            <input class="shadow appearance-none border border-violet-700 rounded border-solid py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text">
                            </input>
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-light mb-2" for="password">
                                Hasło
                            </label>
                            <input class="shadow appearance-none border border-solid border-violet-700 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password">
                            </input>
                        </div>
                        <div class="flex items-center justify-between">
                        </div>
                    </div>
                </div>
                <button class="bg-violet-700 hover:bg-violet-900 text-white font-light py-2 w-5/12 px-4 rounded-xl focus:outline-none focus:shadow-outline mt-4" type="button">
                    Zaloguj
                </button>
            </form>
        </div>
    )
}