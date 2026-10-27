# evermatter.tech — GitHub Pages + 阿里云 DNS

## 顺序很重要

先确认 GitHub Pages 部署成功，再在仓库 **Settings → Pages → Custom domain** 填 `evermatter.tech` 并保存，然后改 DNS。建议先在 GitHub 账户 Settings → Pages 完成域名验证；TXT 值以 GitHub 实际显示为准，不能自行猜测。

本仓库通过 GitHub Actions 发布。自定义域名必须在 Pages 设置中保存；工作流发布不会读取 CNAME 文件来设置域名。

## 阿里云解析记录

在阿里云 DNS 控制台进入 `evermatter.tech` 的解析设置。先备份现有记录。只处理网站对应的 @ / www 记录，不删除邮箱的 MX、TXT、SPF、DKIM 等记录。若 @ 或 www 已有冲突记录，先确认用途，再替换，不能盲目叠加。

| 主机记录 | 类型 | 记录值 |
|---|---|---|
| @ | A | 185.199.108.153 |
| @ | A | 185.199.109.153 |
| @ | A | 185.199.110.153 |
| @ | A | 185.199.111.153 |
| www | CNAME | noaaaaaaa.github.io |

www 的 CNAME 不带 `https://`，也不带 `/Evermatter` 路径。保留现有阿里云 DNS 服务器，不需要更换 nameserver。TTL 可使用控制台默认值。

等待 GitHub DNS check 通过及证书就绪，再勾选 **Enforce HTTPS**。证书或该选项可能需要最多约 24 小时。最后测试首页、Technology/About/Milestones/Contact 深层链接与手机菜单，以及 www 跳转。

注意：GitHub 用户站点的自定义域名可能影响其项目站点的默认地址。以这个仓库 Pages 设置实际返回的 URL 为准；独立绑定 `evermatter.tech` 后使用公司域名，不改动个人站点的设置。

## 状态边界

仓库上传、Actions 部署、域名绑定、DNS 生效及 HTTPS 是不同步骤。只有实际检查到网站可访问且证书有效，才能确认域名上线。此说明文件本身不代表 DNS 已修改。

## 官方依据

- [GitHub：发布 Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [GitHub：管理自定义域名、A 记录与 HTTPS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [阿里云：域名解析设置](https://help.aliyun.com/en/document_detail/2866635.html)
