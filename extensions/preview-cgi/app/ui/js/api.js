// 后端 API 封装
const jsonOrThrow = async (resp) => {
    const data = await resp.json();
    return data;
};

// 核心修改：使用 index.cgi 作为反向代理的入口
// 前端 fetch('index.cgi/api/...') 会被 index.cgi 拦截并转发到 localhost:23237
const API_BASE = "index.cgi";

export const api = {
    library: {
        async importPath(path) {
            const res = await fetch(`${API_BASE}/api/music/import_path`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path })
            });
            return jsonOrThrow(res);
        },
        async externalMeta(path) {
            const res = await fetch(`${API_BASE}/api/music/external/meta?path=${encodeURIComponent(path)}`);
            return jsonOrThrow(res);
        },
        async clearMetadata(id) {
            const res = await fetch(`${API_BASE}/api/music/clear_metadata/${id}`, { method: 'POST' });
            return jsonOrThrow(res);
        },
        async lyrics(query) {
            const res = await fetch(`${API_BASE}/api/music/lyrics${query}`);
            return jsonOrThrow(res);
        },
        async albumArt(query) {
            const res = await fetch(`${API_BASE}/api/music/album-art${query}`);
            return jsonOrThrow(res);
        }
    }
};
