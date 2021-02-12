
import { ContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class AboutUsItem extends ContentItem {
    public metadataOgDescription?: Elements.TextElement;
    public metadataMetaTitle?: Elements.TextElement;
    public metadataOgTitle?: Elements.TextElement;
    public metadataMetaDescription?: Elements.TextElement;
    public metadataTwitterSite?: Elements.TextElement;
    public urlPattern?: Elements.UrlSlugElement;
    public metadataTwitterImage?: Elements.AssetsElement;
    public sitemap?: Elements.TaxonomyElement;
    public metadataTwitterCreator?: Elements.TextElement;
    public metadataTwitterTitle?: Elements.TextElement;
    public metadataTwitterDescription?: Elements.TextElement;
    public metadataOgImage?: Elements.AssetsElement;
    public facts?: Elements.LinkedItemsElement<ContentItem>;
    constructor() {
        super({
            propertyResolver: ((elementName: string) => {
                if (elementName === 'metadata__og_description') {
                    return 'metadataOgDescription';
                }
                if (elementName === 'metadata__meta_title') {
                    return 'metadataMetaTitle';
                }
                if (elementName === 'metadata__og_title') {
                    return 'metadataOgTitle';
                }
                if (elementName === 'metadata__meta_description') {
                    return 'metadataMetaDescription';
                }
                if (elementName === 'metadata__twitter_site') {
                    return 'metadataTwitterSite';
                }
                if (elementName === 'url_pattern') {
                    return 'urlPattern';
                }
                if (elementName === 'metadata__twitter_image') {
                    return 'metadataTwitterImage';
                }
                if (elementName === 'metadata__twitter_creator') {
                    return 'metadataTwitterCreator';
                }
                if (elementName === 'metadata__twitter_title') {
                    return 'metadataTwitterTitle';
                }
                if (elementName === 'metadata__twitter_description') {
                    return 'metadataTwitterDescription';
                }
                if (elementName === 'metadata__og_image') {
                    return 'metadataOgImage';
                }
                return elementName;
            })
        });
    }
}
